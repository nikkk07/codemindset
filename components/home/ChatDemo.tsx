/**
 * A static, illustrative WhatsApp conversation (clearly labelled as an example) that shows a
 * non-technical visitor what a chatbot actually does for their business.
 */
const messages: { from: 'customer' | 'bot'; text: string; time: string }[] = [
  { from: 'customer', text: 'Hi, what are your clinic timings?', time: '9:41 pm' },
  {
    from: 'bot',
    text: 'Hello! 👋 We are open Monday to Saturday, 10 am – 8 pm. Would you like to book an appointment?',
    time: '9:41 pm',
  },
  { from: 'customer', text: 'Yes, tomorrow evening', time: '9:42 pm' },
  {
    from: 'bot',
    text: 'Sure. Slots free tomorrow: 5:30 pm, 6:00 pm or 7:15 pm. Which one suits you?',
    time: '9:42 pm',
  },
  { from: 'customer', text: '6 pm', time: '9:42 pm' },
  {
    from: 'bot',
    text: 'Booked ✅ 6:00 pm tomorrow. Our team will confirm on this number in the morning.',
    time: '9:42 pm',
  },
];

export function ChatDemo() {
  return (
    <figure className="phone" aria-label="Example WhatsApp chatbot conversation for a clinic">
      <div className="phone__screen">
        <div className="phone__top">
          <span className="phone__avatar" aria-hidden="true">
            Y
          </span>
          <span>
            <strong>Your Clinic</strong>
            <small>Business account · replies instantly</small>
          </span>
        </div>
        <ol className="chat">
          {messages.map((m, i) => (
            <li key={i} className={`chat__msg chat__msg--${m.from}`}>
              <span className="sr-only">{m.from === 'bot' ? 'Chatbot: ' : 'Customer: '}</span>
              {m.text}
              <time>{m.time}</time>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>
        Example conversation, for illustration. Your chatbot answers from your own details.
      </figcaption>
    </figure>
  );
}
