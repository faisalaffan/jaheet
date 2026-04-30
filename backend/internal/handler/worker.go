package handler

import (
	"net/http"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/faisalaffan/jaheet/backend/internal/service"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type WorkerHandler struct{ svc *service.WorkerService }

func NewWorkerHandler(svc *service.WorkerService) *WorkerHandler {
	return &WorkerHandler{svc: svc}
}

func (h *WorkerHandler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/", h.List)
	r.Post("/", h.Create)
	r.Get("/{id}", h.Get)
	r.Put("/{id}", h.Update)
	r.Delete("/{id}", h.Delete)
	return r
}

func (h *WorkerHandler) List(w http.ResponseWriter, r *http.Request) {
	list, err := h.svc.List(r.Context())
	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	JSON(w, http.StatusOK, list)
}

func (h *WorkerHandler) Get(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		Error(w, http.StatusBadRequest, "invalid id")
		return
	}
	wk, err := h.svc.GetByID(r.Context(), id)
	if err != nil {
		Error(w, http.StatusNotFound, err.Error())
		return
	}
	JSON(w, http.StatusOK, wk)
}

type workerReq struct {
	Name  string  `json:"name"`
	Role  *string `json:"role"`
	Phone *string `json:"phone"`
}

func (h *WorkerHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req workerReq
	if err := Decode(r, &req); err != nil {
		Error(w, http.StatusBadRequest, "invalid body")
		return
	}
	wk := &domain.Worker{Name: req.Name, Role: req.Role, Phone: req.Phone}
	if err := h.svc.Create(r.Context(), wk); err != nil {
		Error(w, http.StatusBadRequest, err.Error())
		return
	}
	JSON(w, http.StatusCreated, wk)
}

func (h *WorkerHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		Error(w, http.StatusBadRequest, "invalid id")
		return
	}
	var req workerReq
	if err := Decode(r, &req); err != nil {
		Error(w, http.StatusBadRequest, "invalid body")
		return
	}
	wk := &domain.Worker{ID: id, Name: req.Name, Role: req.Role, Phone: req.Phone}
	if err := h.svc.Update(r.Context(), wk); err != nil {
		Error(w, http.StatusNotFound, err.Error())
		return
	}
	JSON(w, http.StatusOK, wk)
}

func (h *WorkerHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		Error(w, http.StatusBadRequest, "invalid id")
		return
	}
	if err := h.svc.Delete(r.Context(), id); err != nil {
		Error(w, http.StatusNotFound, err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
