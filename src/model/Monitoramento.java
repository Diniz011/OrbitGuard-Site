package model;

import java.time.LocalDate;

public class Monitoramento {
    private int id;
    private int regiaoId;
    private double temperatura;
    private double umidade;
    private double chuva;
    private LocalDate data;

    public Monitoramento(final int id, final int regiaoId, final double temperatura,
                         final double umidade, final double chuva, final LocalDate data) {
        this.id = id;
        this.regiaoId = regiaoId;
        this.temperatura = temperatura;
        this.umidade = umidade;
        this.chuva = chuva;
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

    public double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(final double temperatura) {
        this.temperatura = temperatura;
    }

    public double getUmidade() {
        return umidade;
    }

    public void setUmidade(final double umidade) {
        this.umidade = umidade;
    }

    public double getChuva() {
        return chuva;
    }

    public void setChuva(final double chuva) {
        this.chuva = chuva;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(final LocalDate data) {
        this.data = data;
    }
}
