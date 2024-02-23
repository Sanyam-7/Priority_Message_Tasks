class MessagePlatform {
  constructor() {
    this.messages = {
      p0: [],
      p1: [],
      p2: [],
      p3: [],
    };
    this.currentlyDelivering = null;
  }

  addMessage(user, priority, content) {
    if (priority < 0 || priority > 3) {
      throw new Error("Invalid priority level");
    }
    const message = { user, content };
    this.messages[`p${priority}`].push(message);
    this.deliverMessages();
  }

  deliverMessages() {
    if (this.currentlyDelivering) {
      return;
    }
    const p0Messages = this.messages.p0;
    if (p0Messages.length > 0) {
      this.currentlyDelivering = p0Messages.shift();
      setTimeout(() => {
        console.log(
          `Delivered sos message: ${this.currentlyDelivering.content}`
        );
        this.currentlyDelivering = null;
        this.deliverMessages();
      }, 2000);
    } else {
      for (let priority = 1; priority <= 3; priority++) {
        const messages = this.messages[`p${priority}`];
        if (messages.length > 0) {
          this.currentlyDelivering = messages.shift();
          setTimeout(() => {
            console.log(
              `Delivered message: ${this.currentlyDelivering.content}`
            );
            this.currentlyDelivering = null;
            this.deliverMessages();
          }, 2000);
          break;
        }
      }
    }
  }
}

const platform = new MessagePlatform();
platform.addMessage("user1", 0, "Sos message 1");
platform.addMessage("user1", 1, " 1 priority message 1");
platform.addMessage("user2", 2, " 2 prioritymessage 2");
platform.addMessage("user1", 3, "3 priority message 1");
platform.addMessage("user2", 0, "Sos message 2");
platform.addMessage("user2", 1, " 1 priority message 3");
platform.addMessage("user1", 2, " 2 priority message 4");
platform.addMessage("user2", 3, "3 priority message 2");
