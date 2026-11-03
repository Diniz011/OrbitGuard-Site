package service;

import java.util.List;

import model.Monitoramento;
import repository.DataStore;

public class MonitoramentoService {
    private final DataStore store;

    public MonitoramentoService(final DataStore store) {
        this.store = store;
    }

    public List<Monitoramento> listar() {
        return store.getMonitoramentos();
    }

    public int contarPorRegiao(final int regiaoId) {
        int total = 0;
        for (final Monitoramento m : store.getMonitoramentos()) {
            if (m.getRegiaoId() == regiaoId) {
                total++;
            }
        }
        return total;
    }
}
