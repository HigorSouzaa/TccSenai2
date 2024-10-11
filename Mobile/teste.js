import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
 
const { width } = Dimensions.get('window');
 
const Graph = () => {
  const [peso, setPeso] = useState([
    { mes: 'Jan', valor: 93 },
    { mes: 'Fev', valor: 86 },
    { mes: 'Mar', valor: 75 },
    { mes: 'Abr', valor: 0 }, // Valor inicial para o mês atual
  ]);
 
  const handlePesoChange = (mes, novoPeso) => {
    setPeso(prevPeso => {
      return prevPeso.map(item => {
        if (item.mes === mes) {
          return { ...item, valor: novoPeso };
        } else {
          return item;
        }
      });
    });
  };
 
  return (
<View style={styles.container}>
<Text style={styles.titulo}>Peso</Text>
<View style={styles.grafico}>
        {peso.map((item, index) => (
<View key={index} style={styles.coluna}>
<Text style={styles.label}>{item.mes}</Text>
<View style={[styles.barra, { height: item.valor * 2 }]} />
<Text style={styles.valor}>{item.valor}</Text>
<View style={styles.ponto} />
</View>
        ))}
</View>
</View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grafico: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
  },
  coluna: {
    alignItems: 'center',
  },
  barra: {
    width: 20,
    backgroundColor: '#808080',
    marginBottom: 5,
  },
  valor: {
    fontSize: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  ponto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#808080',
  },
});
 
export default Graph;