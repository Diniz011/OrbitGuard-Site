package service;

import model.Usuario;
import repository.DataStore;

public class AuthService {
    private final DataStore store;

    public AuthService(final DataStore store) {
        this.store = store;
    }

    public Usuario login(final String email, final String senha) {
        for (final Usuario u : store.getUsuarios()) {
            if (u.getEmail().equals(email) && u.getSenha().equals(senha)) {
                return u;
            }
        }
        return null;
    }
}
