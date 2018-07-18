export default (points, text) => {
  const regexp = new RegExp(text, 'i');
  return points.filter(point =>
    point.name.match(regexp) || (
      point.type === 'note' ? (
        point.text.match(regexp)
      ) : (
        point.bullets.reduce((accum, bullet) => accum + bullet, '').match(regexp)
      )
    )
  );
};
