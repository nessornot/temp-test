import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SharedSet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/shared/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Набор не найден или не публичен");
                return res.json();
            })
            .then(setDeck)
            .catch((err) => alert(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('jwtToken');
            const res = await fetch(`http://localhost:8080/shared/${id}/copy`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Не удалось скопировать набор");
            }

            alert("Набор добавлен в вашу библиотеку");
            navigate('/library');
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Загрузка...</p>;

    if (!deck) return <p>Набор не найден</p>;

    return (
        <div className="sharedset">
            <h2>{deck.title}</h2>
            <ul>
                {Object.entries(deck.cards).map(([q, a], idx) => (
                    <li key={idx}>
                        <strong>Q:</strong> {q} <br />
                        <strong>A:</strong> {a}
                    </li>
                ))}
            </ul>
            <button onClick={handleSave} disabled={saving}>
                {saving ? "Сохраняем..." : "Сохранить в библиотеку"}
            </button>
        </div>
    );
}
