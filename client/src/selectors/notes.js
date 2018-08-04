export default (notes, text) => {
  const regexp = new RegExp(text, 'i');
  return notes.filter(note =>
    (note.title && note.title.match(regexp)) || (
      note.noteType === 'note' ? (
        note.text.match(regexp)
      ) : (
        note.bullets.reduce((accum, bullet) => accum + bullet, '').match(regexp)
      )
    )
  );
};
