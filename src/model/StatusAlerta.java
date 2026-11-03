package model;

public enum StatusAlerta {
    ATIVO("Ativo"),
    EM_ANALISE("Em analise"),
    RESOLVIDO("Resolvido");

    private final String label;

    StatusAlerta(final String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static StatusAlerta fromNivel(final Nivel nivel) {
        switch (nivel) {
            case ALTO:
                return ATIVO;
            case SECA:
                return EM_ANALISE;
            default:
                return RESOLVIDO;
        }
    }
}
