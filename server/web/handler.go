package web

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"html/template"
	"net/http"
	"server/store"
)

func NewHandler(store store.Store) *Handler {
	h := &Handler{
		Mux:   chi.NewMux(),
		store: store,
	}
	h.Use(middleware.Logger)
	h.Get("/", h.ThreadsList())

	return h
}

type Handler struct {
	*chi.Mux
	store store.Store
}

const threadsListHTML = `<h1>Hello</h1>`

func (h *Handler) ThreadsList() http.HandlerFunc {
	type data struct {
		Threads []store.Store
	}
	tmpl := template.Must(template.New("").Parse(""))
	return func(w http.ResponseWriter, r *http.Request) {
		tt, err := h.store.Orders()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		tmpl.Execute(w, tt)
	}
}
