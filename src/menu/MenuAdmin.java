package menu;

import java.util.List;

import model.Evento;
import model.Nivel;
import model.Regiao;
import model.Usuario;
import service.AnalyticsService;
import service.EventoService;
import service.MonitoramentoService;
import service.RegiaoService;
import service.UsuarioService;

public class MenuAdmin {
    private final Console console;
    private final RegiaoService regiaoService;
    private final UsuarioService usuarioService;
    private final EventoService eventoService;
    private final MonitoramentoService monitoramentoService;
    private final AnalyticsService analyticsService;

    public MenuAdmin(final Console console, final RegiaoService regiaoService,
                     final UsuarioService usuarioService, final EventoService eventoService,
                     final MonitoramentoService monitoramentoService,
                     final AnalyticsService analyticsService) {
        this.console = console;
        this.regiaoService = regiaoService;
        this.usuarioService = usuarioService;
        this.eventoService = eventoService;
        this.monitoramentoService = monitoramentoService;
        this.analyticsService = analyticsService;
    }

    public void exibir(final Usuario usuario) {
        boolean ativo = true;
        while (ativo) {
            console.titulo("Console Operacional - " + usuario.getEmail());
            console.msg("1 - Dashboard");
            console.msg("2 - Regioes");
            console.msg("3 - Usuarios");
            console.msg("4 - Eventos");
            console.msg("5 - Analytics");
            console.msg("6 - Configuracoes");
            console.msg("0 - Sair");

            final int opcao = console.lerInteiro("Opcao: ");
            switch (opcao) {
                case 1:
                    dashboard();
                    break;
                case 2:
                    regioes();
                    break;
                case 3:
                    usuarios();
                    break;
                case 4:
                    eventos();
                    break;
                case 5:
                    analytics();
                    break;
                case 6:
                    configuracoes(usuario);
                    break;
                case 0:
                    ativo = false;
                    break;
                default:
                    console.msg("Opcao invalida.");
            }
        }
    }

    private void dashboard() {
        console.titulo("Dashboard");
        console.msg("Regioes monitoradas : " + analyticsService.contarRegioes());
        console.msg("Monitoramentos      : " + analyticsService.contarMonitoramentos());
        console.msg("Alertas             : " + analyticsService.contarAlertas());
        console.msg("Alertas criticos    : " + analyticsService.contarAlertasPorNivel(Nivel.ALTO));
        console.msg("");
        console.msg("Eventos recentes:");
        final List<Evento> eventos = eventoService.listar();
        final int limite = Math.min(6, eventos.size());
        for (int i = 0; i < limite; i++) {
            final Evento e = eventos.get(i);
            console.msg("- " + nomeRegiao(e.getRegiaoId()) + " | " + e.getTipo()
                + " | " + e.getNivel() + " | " + e.getData());
        }
    }

    private void regioes() {
        boolean ativo = true;
        while (ativo) {
            console.titulo("Regioes");
            for (final Regiao r : regiaoService.listar()) {
                console.msg(r.getId() + " - " + r.getNome() + " / " + r.getEstado());
            }
            console.msg("1 - Nova  2 - Editar  3 - Excluir  0 - Voltar");
            final int opcao = console.lerInteiro("Opcao: ");
            switch (opcao) {
                case 1:
                    novaRegiao();
                    break;
                case 2:
                    editarRegiao();
                    break;
                case 3:
                    excluirRegiao();
                    break;
                case 0:
                    ativo = false;
                    break;
                default:
                    console.msg("Opcao invalida.");
            }
        }
    }

    private void novaRegiao() {
        final String nome = console.lerTexto("Nome: ");
        final String estado = console.lerTexto("Estado (UF): ");
        try {
            final Regiao r = regiaoService.adicionar(nome, estado);
            console.msg("Regiao criada com id " + r.getId() + ".");
        } catch (final IllegalArgumentException e) {
            console.msg("Erro: " + e.getMessage());
        }
    }

    private void editarRegiao() {
        final int id = console.lerInteiro("Id da regiao: ");
        if (regiaoService.buscarPorId(id) == null) {
            console.msg("Regiao nao encontrada.");
            return;
        }
        final String nome = console.lerTexto("Novo nome: ");
        final String estado = console.lerTexto("Novo estado (UF): ");
        try {
            regiaoService.editar(id, nome, estado);
            console.msg("Regiao atualizada.");
        } catch (final IllegalArgumentException e) {
            console.msg("Erro: " + e.getMessage());
        }
    }

    private void excluirRegiao() {
        final int id = console.lerInteiro("Id da regiao: ");
        if (regiaoService.excluir(id)) {
            console.msg("Regiao excluida.");
        } else {
            console.msg("Regiao nao encontrada.");
        }
    }

    private void usuarios() {
        console.titulo("Usuarios");
        for (final Usuario u : usuarioService.listar()) {
            console.msg(u.getId() + " - " + u.getEmail() + " [" + u.getPerfil() + "]");
        }
    }

    private void eventos() {
        console.titulo("Eventos");
        for (final Evento e : eventoService.listar()) {
            console.msg(e.getData() + " | " + nomeRegiao(e.getRegiaoId()) + " | "
                + e.getTipo() + " | " + e.getNivel());
            console.msg("   " + e.getDescricao());
        }
    }

    private void analytics() {
        console.titulo("Analytics");
        console.msg("Indice de risco (nivel ALTO): " + analyticsService.indiceRisco() + "%");
        console.msg("");
        console.msg("Distribuicao por nivel:");
        for (final Nivel n : Nivel.values()) {
            console.msg("- " + n + ": " + analyticsService.contarAlertasPorNivel(n));
        }
        console.msg("");
        console.msg("Monitoramentos por regiao:");
        for (final Regiao r : regiaoService.listar()) {
            console.msg("- " + r.getNome() + ": " + monitoramentoService.contarPorRegiao(r.getId()));
        }
    }

    private void configuracoes(final Usuario usuario) {
        console.titulo("Configuracoes");
        console.msg("Email          : " + usuario.getEmail());
        console.msg("Perfil de acesso: " + usuario.getPerfil());
    }

    private String nomeRegiao(final int regiaoId) {
        final Regiao r = regiaoService.buscarPorId(regiaoId);
        return r == null ? "-" : r.getNome() + " / " + r.getEstado();
    }
}
