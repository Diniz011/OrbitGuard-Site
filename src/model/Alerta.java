package model;

import java.time.LocalDate;

public class Alerta {
    private int id;
    private int regiaoId;
    private Integer monitoramentoId;
    private Nivel nivel;
    private String descricao;
    private StatusAlerta status;
    private LocalDate data;

    public Alerta(final int id, final int regiaoId, final Integer monitoramentoId, final Nivel nivel,
                  final String descricao, final StatusAlerta status, final LocalDate data) {
        this.id = id;
        this.regiaoId = regiaoId;
        this.monitoramentoId = monitoramentoId;
        this.nivel = nivel;
        this.descricao = descricao;
        this.status = status;
        this.data = data;
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

    public Integer getMonitoramentoId() {
        return monitoramentoId;
    }

    public void setMonitoramentoId(final Integer monitoramentoId) {
        this.monitoramentoId = monitoramentoId;
    }

    public Nivel getNivel() {
        return nivel;
    }

    public void setNivel(final Nivel nivel) {
        this.nivel = nivel;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(final String descricao) {
        this.descricao = descricao;
    }

    public StatusAlerta getStatus() {
        return status;
    }

    public void setStatus(final StatusAlerta status) {
        this.status = status;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(final LocalDate data) {
        this.data = data;
    }
}
