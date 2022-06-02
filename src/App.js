
import logo from './logo.svg';
import "@aws-amplify/ui-react/styles.css";
import {
  ThemeProvider, Text, Flex, Badge, StepperField, useTheme,
  withAuthenticator,
  Authenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
  Table, TableBody, TableHead, TableCell, TableRow
} from "@aws-amplify/ui-react";
import { API,graphqlOperation } from 'aws-amplify';
import { theme } from './theme';
import { useState } from 'react';
import { getNote } from './graphql/queries';
import React from 'react';

/*
import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }


function App({signOut}) {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }
  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
            </div>
          ))
        }
      </div>
      <button onClick={signOut}>Sign Out</button>
     
    </div>
  );
}
// <AmplifySignOut />



export default withAuthenticator(App);




function App({ signOut }) {
  return (
    <View className="App">
      <Card>
        <Image src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);

*/



function MainView() {
  const [items,setItems] = useState([
    {
      "id":1,
      "itemCount":0,
      "price":"$0"
    }
  ])

  const addItems = (itemCount,price) => {
    var lastMaxKey = 0
    if (items.length !== 0){
    const ids = items.map((item)=>(item.id))
    var lastMaxKey = Math.max.apply(Math,ids)
    console.log("MaxKey is ",lastMaxKey)
    }
    const newitem = {
      "id":lastMaxKey+1,
      "itemCount":itemCount,
      "price":price
    }
    setItems([...items,newitem])
    console.log(items)
    console.log(getNote)
    const result = API.graphql(graphqlOperation(getNote),{
      "id":"1"
    })
    console.log(result)
  }

  const deleteItems = (key) => {
    const newItems = items.filter((item)=>(item.id !== key))
    setItems(newItems)
    console.log(items)
  }

  
  //console.log(items.length)
  return (
    <ThemeProvider theme={theme}>
      <div>

      <Example imageSrc="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80"
       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque risus in sem dapibus, nec vestibulum metus mattis. Mauris dignissim maximus tellus, in feugiat nibh rhoncus a." 
       productTitle="New Title"
       addToCart={addItems}
       />
       <ReturnTable itemlist={items} deleteItem={deleteItems} />

       </div>
    </ThemeProvider>
  )
}



const Cart = () => {
  return {

  }
}

const ReturnTable = ({itemlist,deleteItem}) => {

  const items = itemlist

  return (
  <Card>
  <Flex direction="column">
  <Table
  caption="CheckOut"
  highlightOnHover="false"
  size="small"
  variation="Striped">
  <TableHead>
    <TableRow>
      <TableCell as="th">Count</TableCell>
      <TableCell as="th">Price</TableCell>
      <TableCell>Delete</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <>
    {items.map((item)=>(
      <TableRow key={item.id}>
      <TableCell>{item.itemCount}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell><button key={item.id} onClick = {(e)=>deleteItem(item.id)}>delete this</button></TableCell>
    </TableRow>
    ))}
    </>
    </TableBody>
    </Table>
    <Button>Check Out</Button>
    </Flex>
    </Card>

  
  )
}


class NoteDisplay extends React.Component {

  constructor() {
      super();
      this.state = { 
        id:"",
        description:"",
        name:""
      }
  }
  
  componentWillMount() {
     const result = API.graphql(getNote,{
       "id":"1"
     })
     console.log(result)
     this.setState({
      id:result.id,
      description:result.description,
      name:result.name
     })
  }

  render({id,desc,name}) {
    return (
      <div>
      <h1>{id}</h1>
      <h2>{desc}</h2>
      <h3>{name}</h3>
      </div>
    )
  }

}

const Example = ({imageSrc,productTitle,description,addToCart}) => {

  const [stepperValue,setStepperValue] = useState(
    1
  )
  const handleOnStepChange = (newValue) => {
    setStepperValue(newValue)
    console.log("setNewValue",newValue)
  }


  const addItem = (e) => {
    console.log(addToCart)
    console.log(e)
    addToCart(stepperValue,"$190")
  } 

  const { tokens } = useTheme();
  return (
    <Card>
      <Flex direction="row" alignItems="flex-start">
        <Image src={imageSrc}
          alt="Grey chair" width="8rem"/>
        <Flex direction="column" gap={tokens.space.xs}>
          <Flex direction="row">
            <Badge variation="success">New</Badge>
          </Flex>
          <Heading level={3}>
            {productTitle}
          </Heading>
          <Text> {description}</Text>
          <Flex direction="row" alignItems="center">
            <Text
              fontSize={tokens.fontSizes.large}
              color={tokens.colors.font.secondary}>
              $199.99
            </Text>
            <StepperField
              label="Stepper"
              defaultValue={1}
              min={0}
              max={10}
              step={1}
              value ={stepperValue}
              onStepChange = {handleOnStepChange}
              labelHidden
            />
            <Button variation="primary" onClick={addItem}>Add to cart</Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}




/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


*/

//export default withAuthenticator(App);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <MainView/>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}