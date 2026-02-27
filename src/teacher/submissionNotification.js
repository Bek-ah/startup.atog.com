const Submission = 'submission';

class SubmissionWasUpdated{
    events = [];
    handlers = [];
    constructor(){
    setInterval(() => {
      const score = Math.floor(Math.random() * 100);
      const date = new Date().toLocaleDateString();
      const userName = 'John Doe';
      this.broadcastEvent(userName, Submission, { name: userName, score: score, date: date });
    }, 500);
  }
    }
  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const SubmissionUpdated = new SubmissionWasUpdated();
export { Submission, SubmissionUpdated };
