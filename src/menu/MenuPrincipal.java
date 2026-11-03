package menu;

import model.Perfil;
import model.Usuario;
import service.AuthService;

public class MenuPrincipal {
    private final Console console;
    private final AuthService authService;
    private final MenuAdmin menuAdmin;
    private final MenuUsuario menuUsuario;

    public MenuPrincipal(final Console console, final AuthService authService,
                         final MenuAdmin menuAdmin, final MenuUsuario menuUsuario) {
        this.console = console;
        this.authService = authService;
        this.menuAdmin = menuAdmin;
        this.menuUsuario = menuUsuario;
    }

    public void iniciar() {
        console.titulo("OrbitGuard");
        final Usuario usuario = autenticar();
        if (usuario.getPerfil() == Perfil.ADMINISTRADOR) {
            menuAdmin.exibir(usuario);
        } else {
            menuUsuario.exibir(usuario);
        }
        console.msg("Sessao encerrada.");
    }

    private Usuario autenticar() {
        while (true) {
            console.titulo("Login");
            final String email = console.lerTexto("Email: ");
            final String senha = console.lerTexto("Senha: ");
            final Usuario usuario = authService.login(email, senha);
            if (usuario != null) {
                console.msg("Bem-vindo, " + usuario.getEmail() + " [" + usuario.getPerfil() + "]");
                return usuario;
            }
            console.msg("Email ou senha invalidos. Tente novamente.");
        }
    }
}
