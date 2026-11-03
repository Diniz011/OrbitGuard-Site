import java.util.Scanner;

import menu.Console;
import menu.MenuAdmin;
import menu.MenuPrincipal;
import menu.MenuUsuario;
import repository.DataStore;
import service.AlertaService;
import service.AnalyticsService;
import service.AuthService;
import service.EventoService;
import service.MonitoramentoService;
import service.RegiaoService;
import service.UsuarioService;

public class Main {
    public static void main(final String[] args) {
        final DataStore store = new DataStore();

        final AuthService authService = new AuthService(store);
        final RegiaoService regiaoService = new RegiaoService(store);
        final UsuarioService usuarioService = new UsuarioService(store);
        final EventoService eventoService = new EventoService(store);
        final MonitoramentoService monitoramentoService = new MonitoramentoService(store);
        final AnalyticsService analyticsService = new AnalyticsService(store);
        final AlertaService alertaService = new AlertaService(store);

        try (Scanner scanner = new Scanner(System.in)) {
            final Console console = new Console(scanner);
            final MenuAdmin menuAdmin = new MenuAdmin(console, regiaoService, usuarioService,
                eventoService, monitoramentoService, analyticsService);
            final MenuUsuario menuUsuario = new MenuUsuario(console, alertaService, regiaoService);
            final MenuPrincipal menuPrincipal = new MenuPrincipal(console, authService, menuAdmin, menuUsuario);
            menuPrincipal.iniciar();
        }
    }
}
