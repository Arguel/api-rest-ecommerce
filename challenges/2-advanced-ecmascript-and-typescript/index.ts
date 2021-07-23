async function operacion(a: number, b: number, operacion: string) {

  switch (operacion) {
    case "suma":
      const sumaM = await import('./suma');
      const suma = new sumaM.default(a, b);
      return suma.ver();
    case "resta":
      const restaM = await import('./resta');
      const resta = new restaM.default(a, b);
      return resta.ver();
  }

}

const operaciones = () => {
  const result = operacion(3, 3, 'suma');
  result.then(console.log)
}

operaciones();
