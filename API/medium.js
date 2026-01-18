export default function handler(req, res) {
  // Pretend these are private admirer messages.
  // Intentional vulnerability: no "ownership" check.
  const messages = {
    "1": "To: Alex — You make my day. - Secret Admirer",
    "2": "To: Sam — Your smile is undefeated. - Secret Admirer",
    "3": "To: Jamie — Meet me by the roses at 7. - Secret Admirer",
    "14": "To: YOU — Here’s the secret: FLAG{valentines_idor_matchmaker}"
  };

  // The IDOR part: user controls this id and can change it.
  const id = (req.query.id || "1").toString();

  const message = messages[id];
  if (!message) {
    res.status(404).send(
      `No message found for id=${id}\n\nTry changing the id parameter like: /medium?id=14`
    );
    return;
  }

  res.status(200).send(
    `💘 Matchmaker Mix-Up\n\nMessage ID: ${id}\n\n${message}\n\nHint: Try other IDs.`
  );
}
