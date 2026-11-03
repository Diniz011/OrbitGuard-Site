package service;

import java.util.List;

import model.Usuario;
import repository.DataStore;

public class UsuarioService {
    private final DataStore store;

    public UsuarioService(final DataStore store) {
        this.store = store;
    }

    public List<Usuario> listar() {
        return store.getUsuarios();
    }
}
