package service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import model.Evento;
import repository.DataStore;

public class EventoService {
    private final DataStore store;

    public EventoService(final DataStore store) {
        this.store = store;
    }

    public List<Evento> listar() {
        final List<Evento> ordenados = new ArrayList<>(store.getEventos());
        ordenados.sort(Comparator.comparing(Evento::getData).reversed());
        return ordenados;
    }
}
