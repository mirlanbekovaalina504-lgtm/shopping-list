import { useMemo, useState } from "react";
import ShoppingItem from "./components/ShoppingItem.jsx";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  function handleAdd(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const parsedPrice = Number(price);

    if (!trimmedName) {
      setError("Введите название товара.");
      return;
    }

    if (price.trim() === "" || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError("Введите корректную цену (0 или больше).");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      name: trimmedName,
      price: parsedPrice
    };

    setItems((currentItems) => [...currentItems, newItem]);
    setName("");
    setPrice("");
    setError("");
  }

  function handleDelete(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  return (
    <main className="page">
      <section className="app-card">
        <div className="heading">
          <div className="cart-icon" aria-hidden="true">🛒</div>
          <div>
            <p className="eyebrow">ПЛАНИРУЙ ПОКУПКИ</p>
            <h1>Список покупок</h1>
            <p className="subtitle">Добавляй товары и следи за общей суммой.</p>
          </div>
        </div>

        <form className="add-form" onSubmit={handleAdd}>
          <label>
            Название товара
            <input
              type="text"
              placeholder="Например, молоко"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
            />
          </label>

          <label>
            Цена (сом)
            <input
              type="number"
              placeholder="Например, 85"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>

          <button className="add-button" type="submit">+ Добавить товар</button>
          {error && <p className="error-message" role="alert">{error}</p>}
        </form>

        <div className="list-heading">
          <h2>Товары</h2>
          <span className="count-badge">{items.length}</span>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">🧺</span>
            <p className="empty-title">Список пока пуст</p>
            <p className="empty-text">Добавь первый товар с помощью формы выше.</p>
          </div>
        ) : (
          <ul className="shopping-list">
            {items.map((item) => (
              <ShoppingItem
                key={item.id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}

        <div className="total-box">
          <div>
            <p className="total-label">Общая стоимость</p>
            <p className="total-note">Всего товаров: {items.length}</p>
          </div>
          <p className="total-price">
            {totalPrice.toLocaleString("ru-RU", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            })} <span>сом</span>
          </p>
        </div>

        <p className="footer-note">Данные хранятся в текущем сеансе страницы.</p>
      </section>
    </main>
  );
}

export default App;
