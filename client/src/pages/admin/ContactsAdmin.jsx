import React, { useState, useEffect } from 'react';
import './CSS-S-Admin/Admin.css'
const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [updatingContact, setUpdatingContact] = useState(null); // Track the contact being updated

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:8080/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddContact = async () => {
    try {
      const response = await fetch('http://localhost:8080/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastName, email, phone, message }),
      });

      if (response.ok) {
        fetchContacts();
        setName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        console.error('Failed to add contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchContacts();
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateContact = (contact) => {
    setUpdatingContact(contact);
    if (updatingContact !== contact) {
      setName(contact.name);
      setLastName(contact.lastName);
      setEmail(contact.email);
      setPhone(contact.phone);
      setMessage(contact.message);
    }
  };

  const saveUpdatedContact = async () => {
    if (!updatingContact) return;

    // Send update request with new name, lastName, email, phone, and message
    try {
      const response = await fetch(`http://localhost:8080/contacts/${updatingContact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
          phone,
          message,
        }),
      });

      if (response.ok) {
        fetchContacts();
        setUpdatingContact(null); // Reset updatingContact after successful update
        setName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        console.error('Failed to update contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='admin'>
      <h2>Contacts Admin</h2>
      <div className='addform'>
        <input
          className='addInputs'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='addInputs'
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className='addInputs'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='addInputs'
          type="text"
          pattern="[0-9]*"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className='addInputs'
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{updatingContact === contact ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : contact.name}</td>
              <td>{updatingContact === contact ? (
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : contact.lastName}</td>
              <td>{updatingContact === contact ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : contact.email}</td>
              <td>{updatingContact === contact ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : contact.phone}</td>
              <td>{updatingContact === contact ? (
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              ) : contact.message}</td>
              <td>
                {updatingContact === contact ? (
                  <button onClick={saveUpdatedContact}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleUpdateContact(contact)}>Update</button>
                    <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsAdmin;
