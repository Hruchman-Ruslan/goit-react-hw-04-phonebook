import { Component } from 'react';
import { nanoid } from 'nanoid';
import contactDefault from '../../data/contacts.json';

import { FormContact } from 'components/Form/Form';
import { ContactList } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { Notification } from '../Notification/Notification';

import { Container, Section, Title, TitleContacts } from '../index';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    // console.log(savedContacts);

    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    }
    this.setState({ contacts: contactDefault });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    // const check = prevState === this.state.contacts;
    // console.log(check);
  }

  addContact = contact => {
    const { contacts } = this.state;
    const existingContact = contacts.find(
      ({ name }) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), ...contact };
    this.setState({
      contacts: [...contacts, newContact],
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilterName = () => {
    const { filter, contacts } = this.state;
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const contacts = this.getFilterName();
    return (
      <Container>
        <Section>
          <Title>Phonebook</Title>
          <FormContact onSubmit={this.addContact} />
        </Section>

        <Section>
          <TitleContacts>Contacts</TitleContacts>
          <Filter value={filter} onChange={this.changeFilter} />
          {contacts.length > 0 ? (
            <ContactList contacts={contacts} onDelete={this.deleteContact} />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </Container>
    );
  }
}
