package menu;

import java.util.Scanner;

public class Console {
    private final Scanner scanner;

    public Console(final Scanner scanner) {
        this.scanner = scanner;
    }

    public String lerTexto(final String rotulo) {
        System.out.print(rotulo);
        return scanner.nextLine().trim();
    }

    public int lerInteiro(final String rotulo) {
        while (true) {
            System.out.print(rotulo);
            final String entrada = scanner.nextLine().trim();
            try {
                return Integer.parseInt(entrada);
            } catch (final NumberFormatException e) {
                System.out.println("Valor invalido. Digite um numero.");
            }
        }
    }

    public void titulo(final String texto) {
        System.out.println();
        System.out.println("=== " + texto + " ===");
    }

    public void msg(final String texto) {
        System.out.println(texto);
    }
}
