import { useState } from 'react'

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  }
}


function PhoneBookForm({ addEntryToPhoneBook }) {

  const [contact, setContact] = useState(
    {
      userFirstname: "Coder",
      userLastname: "Byte",
      userPhone: "8885559999"
    }
  )

  function handleInput(event) {
    const { name, value } = event.target
    setContact(prevContact =>
    (
      {
        ...prevContact,
        [name]: value
      }
    )
    )
  }

  return (
    <form onSubmit={e => { e.preventDefault(); addEntryToPhoneBook(contact); }} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
        value={contact.userFirstname}
        onChange={handleInput}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
        value={contact.userLastname}
        onChange={handleInput}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='text'
        value={contact.userPhone}
        onChange={handleInput}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
        value='Add User'
      />
    </form>
  )
}

function InformationTable(props) {
  //Contact template:
  // {
  //   userFirstname: "Coder",
  //   userLastname: "Byte",
  //   userPhone: "8885559999"
  // }

  const contacts = props.phoneBook.map((contact,index) => {
    return (
      <tr key={index}>
        <td style={style.tableCell}>{contact.userFirstname}</td>
        <td style={style.tableCell}>{contact.userLastname}</td>
        <td style={style.tableCell}>{contact.userPhone}</td>
      </tr>
    )
  })

  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
        {contacts}
      </thead>
    </table>
  );
}

function Application() {
  const [phoneBook, updatePhoneBook] = useState([]);
  console.log(phoneBook);
  function addEntryToPhoneBook(contact) {
    updatePhoneBook(prevPB => {
      const currentPB = [...prevPB, contact]
      currentPB.sort((a, b) => {
        const nameA = a.userLastname.toUpperCase();
        const nameB = b.userLastname.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      return currentPB;
    });
  }
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable phoneBook={phoneBook} />
    </section>
  )
}

export default Application
