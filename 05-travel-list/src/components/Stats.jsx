export const Stats = (props) => {
  const { items } = props;

  if (!items.length) return (
    <p className="stats">
      <em>Start adding some items to your packing list 🚀</em>
    </p>
  );

  const numItems = items.length;
  const numItemsPacked = items.filter(item => item.packed).length;
  const percentage = Math.round(numItemsPacked / numItems * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ?
          'You have everything! Ready to go ✈' :
          `👜 You have ${numItems} items on your list, and you already packed ${numItemsPacked} (${percentage}%).`}
      </em>
    </footer>
  );
};

export default Stats;
