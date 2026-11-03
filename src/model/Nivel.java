package model;

public enum Nivel {
    ALTO("Risco elevado detectado nas leituras ambientais da regiao."),
    SECA("Baixa precipitacao registrada, condicao de seca em monitoramento."),
    BAIXO("Condicoes ambientais dentro dos parametros esperados.");

    private final String descricao;

    Nivel(final String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
