package repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import model.Alerta;
import model.Evento;
import model.Monitoramento;
import model.Nivel;
import model.Perfil;
import model.Regiao;
import model.StatusAlerta;
import model.Usuario;

public class DataStore {
    private final List<Usuario> usuarios = new ArrayList<>();
    private final List<Regiao> regioes = new ArrayList<>();
    private final List<Monitoramento> monitoramentos = new ArrayList<>();
    private final List<Alerta> alertas = new ArrayList<>();
    private final List<Evento> eventos = new ArrayList<>();

    public DataStore() {
        seed();
    }

    private void seed() {
        usuarios.add(new Usuario(1, "admin@orbitguard.com", "admin123", Perfil.ADMINISTRADOR));
        usuarios.add(new Usuario(2, "user@orbitguard.com", "user123", Perfil.USUARIO));

        regioes.add(new Regiao(1, "Manaus", "AM"));
        regioes.add(new Regiao(2, "Pantanal", "MS"));
        regioes.add(new Regiao(3, "Cerrado - Brasilia", "DF"));
        regioes.add(new Regiao(4, "Caatinga - Petrolina", "PE"));
        regioes.add(new Regiao(5, "Vale do Paraiba", "SP"));

        monitoramentos.add(new Monitoramento(1, 1, 32.4, 78, 64, LocalDate.parse("2026-05-28")));
        monitoramentos.add(new Monitoramento(2, 2, 36.1, 41, 12, LocalDate.parse("2026-05-29")));
        monitoramentos.add(new Monitoramento(3, 3, 29.8, 34, 8, LocalDate.parse("2026-05-30")));
        monitoramentos.add(new Monitoramento(4, 4, 38.7, 19, 3, LocalDate.parse("2026-05-30")));
        monitoramentos.add(new Monitoramento(5, 5, 24.5, 64, 41, LocalDate.parse("2026-05-31")));
        monitoramentos.add(new Monitoramento(6, 1, 33.1, 76, 59, LocalDate.parse("2026-06-03")));
        monitoramentos.add(new Monitoramento(7, 2, 37.9, 33, 14, LocalDate.parse("2026-06-03")));
        monitoramentos.add(new Monitoramento(8, 3, 28.4, 38, 5, LocalDate.parse("2026-06-04")));

        alertas.add(new Alerta(1, 1, 1, Nivel.BAIXO, Nivel.BAIXO.getDescricao(), StatusAlerta.RESOLVIDO, LocalDate.parse("2026-05-28")));
        alertas.add(new Alerta(2, 2, 2, Nivel.ALTO, Nivel.ALTO.getDescricao(), StatusAlerta.ATIVO, LocalDate.parse("2026-05-29")));
        alertas.add(new Alerta(3, 3, 3, Nivel.SECA, Nivel.SECA.getDescricao(), StatusAlerta.EM_ANALISE, LocalDate.parse("2026-05-30")));
        alertas.add(new Alerta(4, 4, 4, Nivel.ALTO, Nivel.ALTO.getDescricao(), StatusAlerta.ATIVO, LocalDate.parse("2026-05-30")));
        alertas.add(new Alerta(5, 5, 5, Nivel.BAIXO, Nivel.BAIXO.getDescricao(), StatusAlerta.RESOLVIDO, LocalDate.parse("2026-05-31")));
        alertas.add(new Alerta(6, 1, 6, Nivel.BAIXO, Nivel.BAIXO.getDescricao(), StatusAlerta.RESOLVIDO, LocalDate.parse("2026-06-03")));
        alertas.add(new Alerta(7, 2, 7, Nivel.ALTO, Nivel.ALTO.getDescricao(), StatusAlerta.ATIVO, LocalDate.parse("2026-06-03")));
        alertas.add(new Alerta(8, 3, 8, Nivel.SECA, Nivel.SECA.getDescricao(), StatusAlerta.EM_ANALISE, LocalDate.parse("2026-06-04")));
        alertas.add(new Alerta(9, 4, null, Nivel.ALTO, "Acompanhamento de seca na regiao de interesse.", StatusAlerta.ATIVO, LocalDate.parse("2026-06-05")));
        alertas.add(new Alerta(10, 5, null, Nivel.BAIXO, "Monitorando possiveis tempestades no Vale do Paraiba.", StatusAlerta.ATIVO, LocalDate.parse("2026-06-06")));

        eventos.add(new Evento(1, 4, "Seca", Nivel.ALTO, LocalDate.parse("2026-06-04"), "Seca severa registrada na Caatinga com solo critico."));
        eventos.add(new Evento(2, 2, "Calor extremo", Nivel.ALTO, LocalDate.parse("2026-06-03"), "Onda de calor extremo sobre o Pantanal."));
        eventos.add(new Evento(3, 3, "Seca", Nivel.SECA, LocalDate.parse("2026-06-04"), "Periodo prolongado de baixa precipitacao no Cerrado."));
        eventos.add(new Evento(4, 5, "Calor extremo", Nivel.BAIXO, LocalDate.parse("2026-06-04"), "Elevacao moderada de temperatura no Vale do Paraiba."));
        eventos.add(new Evento(5, 1, "Tempestade", Nivel.BAIXO, LocalDate.parse("2026-06-03"), "Tempestade tropical de baixa intensidade em Manaus."));
        eventos.add(new Evento(6, 4, "Calor extremo", Nivel.ALTO, LocalDate.parse("2026-05-30"), "Temperatura recorde acompanhada de baixa umidade."));
        eventos.add(new Evento(7, 2, "Incendio", Nivel.SECA, LocalDate.parse("2026-05-29"), "Foco de incendio favorecido por estiagem no Pantanal."));
        eventos.add(new Evento(8, 3, "Seca", Nivel.SECA, LocalDate.parse("2026-05-30"), "Reservatorios em queda devido a estiagem no Cerrado."));
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public List<Regiao> getRegioes() {
        return regioes;
    }

    public List<Monitoramento> getMonitoramentos() {
        return monitoramentos;
    }

    public List<Alerta> getAlertas() {
        return alertas;
    }

    public List<Evento> getEventos() {
        return eventos;
    }
}
