package model;

import java.time.LocalDate;

public class Evento {
    private int id;
    private int regiaoId;
    private String tipo;
    private Nivel nivel;
    private LocalDate data;
    private String descricao;

    public Evento(final int id, final int regiaoId, final String tipo, final Nivel nivel,
                  final LocalDate data, final String descricao) {
        this.id = id;
        this.regiaoId = regiaoId;
        this.tipo = tipo;
        this.nivel = nivel;
        this.data = data;
        this.descricao = descricao;
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public int getRegiaoId() {
        return regiaoId;
    }

    public void setRegiaoId(final int regiaoId) {
        this.regiaoId = regiaoId;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(final String tipo) {
        this.tipo = tipo;
    }

    public Nivel getNivel() {
        return nivel;
    }

    public void setNivel(final Nivel nivel) {
        this.nivel = nivel;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(final LocalDate data) {
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(final String descricao) {
        this.descricao = descricao;
    }
}
