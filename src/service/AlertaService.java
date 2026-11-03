package service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import model.Alerta;
import model.Nivel;
import model.StatusAlerta;
import repository.DataStore;

public class AlertaService {
    private final DataStore store;

    public AlertaService(final DataStore store) {
        this.store = store;
    }

    public List<Alerta> listar() {
        final List<Alerta> ordenados = new ArrayList<>(store.getAlertas());
        ordenados.sort(Comparator.comparing(Alerta::getData).reversed());
        return ordenados;
    }

    public Alerta adicionar(final int regiaoId, final Nivel nivel, final String observacao) {
        final String descricao = (observacao == null || observacao.trim().isEmpty())
            ? nivel.getDescricao()
            : observacao.trim();
        final Alerta a = new Alerta(proximoId(), regiaoId, null, nivel, descricao,
            StatusAlerta.ATIVO, LocalDate.now());
        store.getAlertas().add(a);
        return a;
    }

    public static Nivel calcNivel(final double temperatura, final double umidade, final double chuva) {
        if (temperatura > 35 || umidade < 30) {
            return Nivel.ALTO;
        }
        if (chuva < 20) {
            return Nivel.SECA;
        }
        return Nivel.BAIXO;
    }

    private int proximoId() {
        int max = 0;
        for (final Alerta a : store.getAlertas()) {
            if (a.getId() > max) {
                max = a.getId();
            }
        }
        return max + 1;
    }
}
