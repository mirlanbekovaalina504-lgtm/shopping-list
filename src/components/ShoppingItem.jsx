function ShoppingItem({ item, onDelete }) {
  return (
    <li className="shopping-item">
      <div className="item-info">
        <span className="item-name">{item.name}</span>
        <span className="item-price">{item.price.toLocaleString("ru-RU", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        })} сом</span>
      </div>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(item.id)}
        aria-label={`Удалить ${item.name}`}
        title="Удалить товар"
      >
        Удалить
      </button>
    </li>
  );
}

export default ShoppingItem;
