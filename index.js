const contacts = require("./contacts.js");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);
    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({ action: "list" });
invokeAction({ action: "get", id: "1DEXoP8AuCGYc1YgoQ6hw" });
invokeAction({ action: "get", id: "1DEXoP8AuCGYc1YgoQ6h" });
invokeAction({
  action: "add",
  name: "Dany Ross",
  email: "ross@fhkjghkj.net",
  phone: "(000) 800-2949",
});
