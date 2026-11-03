package service;

import java.util.List;

import model.Regiao;
import repository.DataStore;

public class RegiaoService {
    private final DataStore store;

    public RegiaoService(final DataStore store) {
        this.store = store;
    }

    public List<Regiao> listar() {
        return store.getRegioes();
    }

    public Regiao buscarPorId(final int id) {
        for (final Regiao r : store.getRegioes()) {
            if (r.getId() == id) {
                return r;
            }
        }
        return null;
    }

    public Regiao adicionar(final String nome, final String estado) {
        validar(nome, estado);
        final int id = proximoId();
        final Regiao r = new Regiao(id, nome.trim(), estado.trim().toUpperCase());
        store.getRegioes().add(r);
        return r;
    }

    public boolean editar(final int id, final String nome, final String estado) {
        final Regiao r = buscarPorId(id);
        if (r == null) {
            return false;
        }
        validar(nome, estado);
        r.setNome(nome.trim());
        r.setEstado(estado.trim().toUpperCase());
        return true;
    }

    public boolean excluir(final int id) {
        return store.getRegioes().removeIf(r -> r.getId() == id);
    }

    private void validar(final String nome, final String estado) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome da regiao e obrigatorio.");
        }
        if (estado == null || estado.trim().length() != 2) {
            throw new IllegalArgumentException("Estado deve ter 2 letras (UF).");
        }
    }

    private int proximoId() {
        int max = 0;
        for (final Regiao r : store.getRegioes()) {
            if (r.getId() > max) {
                max = r.getId();
            }
        }
        return max + 1;
    }
}
