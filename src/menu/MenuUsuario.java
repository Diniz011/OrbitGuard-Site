package menu;

import model.Alerta;
import model.Nivel;
import model.Regiao;
import model.Usuario;
import service.AlertaService;
import service.RegiaoService;

public class MenuUsuario {
    private final Console console;
    private final AlertaService alertaService;
    private final RegiaoService regiaoService;

    public MenuUsuario(final Console console, final AlertaService alertaService,
                       final RegiaoService regiaoService) {
        this.console = console;
        this.alertaService = alertaService;
        this.regiaoService = regiaoService;
    }

    public void exibir(final Usuario usuario) {
        boolean ativo = true;
        while (ativo) {
            console.titulo("Painel do Usuario - " + usuario.getEmail());
            console.msg("1 - Meus Alertas");
            console.msg("2 - Adicionar Alerta");
            console.msg("3 - Aplicativo Mobile");
            console.msg("4 - Configuracoes");
            console.msg("0 - Sair");
            final int opcao = console.lerInteiro("Opcao: ");
            switch (opcao) {
                case 1:
                    meusAlertas();
                    break;
                case 2:
                    adicionarAlerta();
                    break;
                case 3:
                    mobile();
                    break;
                case 4:
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

    private void meusAlertas() {
        console.titulo("Meus Alertas");
        for (final Alerta a : alertaService.listar()) {
            console.msg(a.getData() + " | " + nomeRegiao(a.getRegiaoId()) + " | "
                + a.getNivel() + " | " + a.getStatus().getLabel());
            console.msg("   " + a.getDescricao());
        }
    }

    private void adicionarAlerta() {
        console.titulo("Adicionar Alerta");
        for (final Regiao r : regiaoService.listar()) {
            console.msg(r.getId() + " - " + r.getNome() + " / " + r.getEstado());
        }
        final int regiaoId = console.lerInteiro("Id da regiao: ");
        if (regiaoService.buscarPorId(regiaoId) == null) {
            console.msg("Regiao nao encontrada.");
            return;
        }
        final Nivel nivel = lerNivel();
        final String obs = console.lerTexto("Observacoes (opcional): ");
        final Alerta a = alertaService.adicionar(regiaoId, nivel, obs);
        console.msg("Alerta registrado com id " + a.getId() + " (status " + a.getStatus().getLabel() + ").");
    }

    private Nivel lerNivel() {
        while (true) {
            console.msg("Nivel: 1 - ALTO  2 - SECA  3 - BAIXO");
            final int opcao = console.lerInteiro("Opcao: ");
            switch (opcao) {
                case 1:
                    return Nivel.ALTO;
                case 2:
                    return Nivel.SECA;
                case 3:
                    return Nivel.BAIXO;
                default:
                    console.msg("Opcao invalida.");
            }
        }
    }

    private void mobile() {
        console.titulo("Aplicativo Mobile");
        console.msg("Acompanhe alertas e eventos da sua regiao pelo app OrbitGuard.");
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
