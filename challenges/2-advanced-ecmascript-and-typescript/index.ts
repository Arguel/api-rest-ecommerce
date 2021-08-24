async function operacion(a: number, b: number, operacion: string) {
  switch (operacion) {
    case "suma":
      const SumaModulo = await import("./suma");
      const Suma = new SumaModulo.default(a, b);
      return Suma.ver();
    case "resta":
      const RestaModulo = await import("./resta");
      const Resta = new RestaModulo.default(a, b);
      return Resta.ver();
  }
}

const operaciones = () => {
  const result = operacion(3, 3, "suma");
  result.then(console.log);
};

operaciones();
