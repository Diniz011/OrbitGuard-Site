package service;

import model.Alerta;
import model.Nivel;
import repository.DataStore;

public class AnalyticsService {
    private final DataStore store;

    public AnalyticsService(final DataStore store) {
        this.store = store;
    }

    public int contarRegioes() {
        return store.getRegioes().size();
    }

    public int contarMonitoramentos() {
        return store.getMonitoramentos().size();
    }

    public int contarAlertas() {
        return store.getAlertas().size();
    }

    public int contarEventos() {
        return store.getEventos().size();
    }

    public int contarAlertasPorNivel(final Nivel nivel) {
        int total = 0;
        for (final Alerta a : store.getAlertas()) {
            if (a.getNivel() == nivel) {
                total++;
            }
        }
        return total;
    }

    public int indiceRisco() {
        final int total = contarAlertas();
        if (total == 0) {
            return 0;
        }
        return Math.round((contarAlertasPorNivel(Nivel.ALTO) * 100f) / total);
    }
}
