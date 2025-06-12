import { serverTimestamp } from "firebase/firestore";

// 🔸 Represents a single menu item
export class MenuItem {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.selectedBy = []; // Array of participant IDs
  }

  addParticipant(participantId) {
    if (!this.selectedBy.includes(participantId)) {
      this.selectedBy.push(participantId);
    }
  }

  static fromFirestore(data) {
    return new MenuItem(data.id, data.name, data.price, data.selectedBy || []);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      selectedBy: this.selectedBy
    };
  }
}
// 🔸 Represents an item selected by a participant
export class SelectedItem {
  constructor(item, quantity = 0) {
    this.itemId = item.id;
    this.name = item.name;
    this.price = item.price;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }

  incrment() {
    this.quantity++;
  }

  decrement() {
    this.quantity -= (!this.quantity) ? 0 : 1;
  }

  static fromFirestore(data) {
    return new SelectedItem({ id: data.itemId, name: data.name, price: data.price }, data.quantity);
  }

  toJSON() {
    return {
      itemId: this.itemId,
      name: this.name,
      price: this.price,
      quantity: this.quantity
    };
  }
}
// 🔸 Represents a participant in the space
export class Participant {
  constructor(id, name, selectedItems = []) {
    this.id = id;
    this.name = name;
    this.joinedAt = serverTimestamp();
    this.selectedItems = selectedItems; // array of SelectedItem
  }

  selectItem(menuItem, quantity) {
    menuItem.addParticipant(this.id);
    const existing = this.selectedItems.find(i => i.itemId === menuItem.id);
    if (existing) {
      existing.quantity = quantity;
    } else {
      this.selectedItems.push(new SelectedItem(menuItem, quantity));
    }
  }
  static fromFirestore(data) {
    const items = data.selectedItems?.map(SelectedItem.fromFirestore) || [];
    return new Participant(data.id, data.name, items);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      joinedAt: this.joinedAt,
      selectedItems: this.selectedItems.map(item => item.toJSON())
    };
  }
}
// 🔸 Represents the entire space (shared order session)
export class Space {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isClosed = false;
    this.createdAt = serverTimestamp();
    this.participants = []; // array of Participant
    this.menuItems = [];    // array of MenuItem
    this.order = null;      // populated later
  }

  addParticipant(participant) {
    if (!this.participants.find(p => p.id === participant.id)) {
      this.participants.push(participant);
    }
  }

  addMenuItem(menuItem) {
    if (!this.menuItems.find(item => item.id === menuItem.id)) {
      this.menuItems.push(menuItem);
    }
  }

  generateOrder() {
    this.order = new Order();
    for (const participant of this.participants) {
      for (const selected of participant.selectedItems) {
        this.order.addSelectedItem(selected);
      }
    }
  }
  static fromFirestore(data) {
    const participants = data.participants?.map(Participant.fromFirestore) || [];
    const menuItems = data.menuItems?.map(MenuItem.fromFirestore) || [];
    const order = data.order ? Order.fromFirestore(data.order) : null;

    return new Space(data.id, data.name, data.description, data.createdAt, data.isClosed, participants, menuItems, order);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isClosed: this.isClosed,
      createdAt: this.createdAt,
      participants: this.participants.map(p => p.toJSON()),
      menuItems: this.menuItems.map(m => m.toJSON()),
      order: this.order ? this.order.toJSON() : null
    };
  }
}
// 🔸 Final order, containing all selected items
export class Order {
  constructor() {
    this.selectedItems = []; // array of SelectedItem
    this.isFavourite = false;
    this.createdAt = serverTimestamp();
  }

  addSelectedItem(item) {
    const existing = this.selectedItems.find(i => i.itemId === item.itemId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.selectedItems.push(item);
    }
  }
  ToggleFavourite() {
    this.isFavourite = !this.isFavourite;
  }
  static fromFirestore(data) {
    const order = new Order();
    order.selectedItems = (data.selectedItems || []).map(SelectedItem.fromFirestore);
    order.isFavourite = data.isFavourite ?? false;
    order.createdAt = data.createdAt ?? serverTimestamp();
    return order;
  }
  toJSON() {
    return {
      createdAt: this.createdAt,
      isFavourite: this.isFavourite,
      selectedItems: this.selectedItems.map(i => i.toJSON())
    };
  }
}


export class Admin {
  constructor(id, orders = [], rooms = []) {
    this.id = id;
    this.orders = orders;
    this.rooms = rooms;
  }

  static fromFirestore(data) {
    return new Admin(data.id, data.orders || [], data.rooms || []);
  }

  getFavouritesOrders() {
    return this.orders.filter(order => order.isFavourite);
  }

  getRecentOrders() {
    return this.orders.sort((a, b) => b.createdAt - a.createdAt);
  }

  toJSON() {
    return {
      id: this.id,
      orders: this.orders.map(order => order.toJSON?.() ?? order),
      rooms: this.rooms,
    };
  }
}
