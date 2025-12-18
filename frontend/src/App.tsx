import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './App.css';
import axios from 'axios';
// Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, addItem, deleteItem, updateItem } from './redux/store';
// Zod
import { z } from 'zod';
import { itemSchema, ItemInput } from '../../backend/utils/validation';






interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
//Zod
const [errors, setErrors] = useState<Partial<ItemInput>>({});
const [editErrors, setEditErrors] = useState<Partial<ItemInput>>({});






  const items = useSelector(selectItems);
  const dispatch = useDispatch();


  const handleAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSelectedItem(null);
    setAlertOpen(false);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items');
        response.data.forEach((item: Item) => dispatch(addItem(item)));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    fetchItems();
  }, [dispatch]);
  
  const handleAddItem = async () => {
    try {
      const formData = { name, description, price: parseFloat(price) };
      const validatedData = itemSchema.parse(formData); 
  
      // Proceed with adding the item if validation is successful
      const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      const newItem: Item = {
        id: newId,
        ...validatedData, 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      await axios.post('http://localhost:8080/api/items', newItem);
      dispatch(addItem(newItem)); 
      setName('');
      setDescription('');
      setPrice('');
      setErrors({}); // Clear errors after successful submission
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract errors and update state to display error messages
        const fieldErrors = {};
        error.errors.forEach(err => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  const handleUpdateItem = async () => {
    if (editingItem) {
      try {
        const updatedData = { ...editingItem, price: parseFloat(editingItem.price) };
        const validatedData = itemSchema.safeParse(updatedData); 
  
        if (!validatedData.success) {
          // Handle validation errors
          setEditErrors(validatedData.error.issues.reduce((acc, issue) => {
            acc[issue.path[0]] = issue.message;
            return acc;
          }, {})); 
          return;
        }
  
        const updatedItem = {
          ...editingItem,
          ...validatedData.data, // Use validated data
          updatedAt: new Date().toISOString(),
        };
  
        await axios.put(`http://localhost:8080/api/item/${editingItem.id}`, updatedItem);
        dispatch(updateItem(updatedItem));
        setEditingItem(null); 
        setEditErrors({}); // Clear errors after successful update
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  };


  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/item/${id}`);
      dispatch(deleteItem(id));
      setAlertOpen(true);
      setOpen(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    
    }
  };
  

  const handleClickOpen = (item: Item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditChange = (field: string, value: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    }
  };

  return (
    <div className='main'>
      <Box
        component="form"
        sx={{ '& > :not(style)': { width: '100%' }, display: 'flex', flexDirection: 'column', gap: 2 }}
        autoComplete="off"
      >
        <TextField
          label="Name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
          <FilledInput
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
           {errors.price && <FormHelperText id="component-error-text" style={{ color:"red" }} >{errors.price}</FormHelperText>}
        </FormControl>
        <Button variant="contained" onClick={handleAddItem}>Add Item</Button>
      </Box>

      <TableContainer component={Paper} sx={{maxHeight: 340, marginTop: 4 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="items table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight:"bold", background:"#FAF7F0" }}>ID</TableCell>
              <TableCell style={{ fontWeight:"bold", background:"#FAF7F0" }}>Name</TableCell>
              <TableCell style={{ fontWeight:"bold", background:"#FAF7F0" }}>Description</TableCell>
              <TableCell style={{ fontWeight:"bold", background:"#FAF7F0" }}>Price</TableCell>
              <TableCell style={{ fontWeight:"bold", background:"#FAF7F0" }}>Created At</TableCell>
              <TableCell style={{ fontWeight:"bold", background:"#FAF7F0" }}>Updated At</TableCell>
              <TableCell style={{ fontWeight:"bold", background:"#FAF7F0" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {editingItem?.id === item.id ? (
                    <input
                      className='editField'
                      value={editingItem.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
               {editingItem?.id === item.id && editErrors.name && <FormHelperText id="component-error-text" style={{ color: 'red', fontSize: '12px' }}>{editErrors.name}</FormHelperText>} 
                </TableCell>
                <TableCell>
                  {editingItem?.id === item.id ? (
                    <textarea
                      className='editField'
                      value={editingItem.description}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                    />
                  ) : (
                    item.description
                  )}
                  {editingItem?.id === item.id && editErrors.description && <FormHelperText id="component-error-text" style={{ color: 'red', fontSize: '12px' }}>{editErrors.description}</FormHelperText>} 
                </TableCell>
                <TableCell>
                  {editingItem?.id === item.id ? (
                    <input
                      className='editField'
                      value={editingItem.price}
                      onChange={(e) => handleEditChange('price', e.target.value)}
                      type="number"
                    />
                  ) : (
                    `$${item.price}`
                  )}
                  {editingItem?.id === item.id && editErrors.price && <FormHelperText id="component-error-text" style={{ color: 'red'}}>{editErrors.price}</FormHelperText>} 
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell>{item.createdAt === item.updatedAt ? "-" : new Date(item.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  {editingItem?.id === item.id ? (
                    <Button variant="contained" onClick={handleUpdateItem}>
                      <DoneIcon />
                    </Button>
                  ) : (
                    <Button style={{ margin: '2px' }} variant="contained" color="warning" onClick={() => setEditingItem(item)}>
                      <ModeEditIcon />
                    </Button>
                  )}
                  <Button style={{ margin: '2px' }} variant="contained" color="error" onClick={() => handleClickOpen(item)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the item "{selectedItem?.name}" with ID {selectedItem?.id}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => selectedItem && handleDeleteItem(selectedItem.id)}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alertOpen} autoHideDuration={1000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" variant="filled">
          {`Item ${selectedItem?.name} has been deleted successfully`}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
