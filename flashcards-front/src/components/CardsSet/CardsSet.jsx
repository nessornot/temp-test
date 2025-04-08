import React from 'react'
import './CardsSet.scss'
import {useNavigate} from "react-router-dom";


export default function CardsSet({ id, title, author, count, isPublic, onDelete }) {
    const navigate = useNavigate();

    const handleCopyLink = () => {
        const link = `${window.location.origin}/shared/${id}`;
        navigator.clipboard.writeText(link).then(() => {
            alert("Ссылка на набор скопирована в буфер обмена");
        }).catch((err) => {
            console.error("Ошибка копирования:", err);
            alert("Не удалось скопировать ссылку");
        });
    };


    return (
      <div className="cardsset">
          <div className="cardsset__icon">
              <img src="/img/cardsSet.svg" alt="" className="cardsset_icon__img"/>
          </div>
          <div className="cardsset__content">
              <button className="cardsset__content__title" onClick={() => navigate(`/learn/${id}`)}>
                  {title}
              </button>
              <div className="cardsset__row">
                  <div className="cardsset__row__item">Кол-во карточек: {count}</div>
                  <div className="cardsset__row__item">Автор: {author}</div>
              </div>
          </div>
          <div className="cardsset__column">
              <button className="cardsset__btn" onClick={() => onDelete(id)}>
                  <img src="/img/deleteCard.svg" alt="" className="cardsset__img"/>
              </button>
              <button className="cardsset__btn" onClick={() => navigate(`/edit/${id}`)}>
                  <img src="/img/create.svg" alt="" className="cardsset__img"/>
              </button>
          </div>
          {isPublic && (
              <button onClick={handleCopyLink}>Скопировать ссылку</button>
          )}
      </div>
    );
}

