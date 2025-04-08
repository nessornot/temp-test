package main

import (
	"flashcards-back/internal/config"
	"flashcards-back/internal/handlers"
	"flashcards-back/internal/middleware"
	"log"
	"net/http"
)

func main() {
	config.Init()

	mux := http.NewServeMux()

	mux.HandleFunc("/register", handlers.Register)
	mux.HandleFunc("/login", handlers.Login)
	mux.Handle("/decks", middleware.AuthMiddleWare(http.HandlerFunc(handlers.DecksHandler)))
	mux.Handle("/decks/", middleware.AuthMiddleWare(http.HandlerFunc(handlers.DeckByIDHandler)))
	mux.Handle("/ai/cards", middleware.AuthMiddleWare(http.HandlerFunc(handlers.CardsFromText)))
	mux.Handle("/ai/reword", middleware.AuthMiddleWare(http.HandlerFunc(handlers.RewordQuestions)))
	//mux.Handle("/shared/", middleware.AuthMiddleWare(http.HandlerFunc(handlers.SharedDeckHandler)))
	//mux.HandleFunc("/shared/", handlers.GetSharedDeck)
	//mux.Handle("/shared/", middleware.AuthMiddleWare(http.HandlerFunc(handlers.CopySharedDeck)))
	mux.HandleFunc("/shared/", handlers.SharedDeckHandler)

	handler := middleware.EnableCORS(mux)

	log.Println("start serving. port: 8080")
	err := http.ListenAndServe(":8080", handler)
	if err != nil {
		log.Fatal(err)
		return
	}
}
