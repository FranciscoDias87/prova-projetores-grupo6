# Projeto Grupo 6

**Integrantes:**
- Cicero Renan
- Jorge
- Lucas

---

## 📋 Análise de Código - Critérios de Avaliação

### ✅ **PONTOS POSITIVOS**

| Critério | Status | Detalhes |
|----------|--------|----------|
| **Tags Semânticas** | ✅ Bom | Uso correto de `<header>`, `<main>`, `<section>`, `<footer>` |
| **Tipos de Input** | ✅ Bom | Uso apropriado de `type="date"` e `type="time"` |
| **Estrutura Geral** | ✅ Bom | Sem abuso de divs desnecessárias |
| **Meta Tags** | ✅ Bom | Includes charset UTF-8 e viewport meta |

---

### ❌ **PROBLEMAS CRÍTICOS**

#### **1. Estrutura de Tabela Incorreta**
```html
<table>
    </thead>           ❌ Fechando antes de abrir
    <tbody>
        <tr>
            <th>       ❌ <th> dentro de <tbody> (deve estar em <thead>)
            <td>...</td>
            ...
            </th>      ❌ Fechando incorretamente
        </tr>
    </tbody>
    </thead>           ❌ Fechando tag que nunca foi aberta
</table>
```

**Correto seria:**
```html
<table>
    <thead>
        <tr>
            <th>Dias</th>
            <th>Horarios</th>
            <th>Turma</th>
            <th>Professor</th>
        </tr>
    </thead>
    <tbody>
        <!-- linhas de dados aqui -->
    </tbody>
</table>
```

#### **2. Labels não associados aos Inputs**
```html
<label for="">Nome do professor</label>     ❌ for="" vazio
<input type="text" name="nome do professor" id="">  ❌ id="" vazio

<label for="">Turma</label>                 ❌ for="" vazio
<input type="text" name="turma" id="">      ❌ id="" vazio

<select name="" id="">                      ❌ name="" vazio, sem label
```

**Correto seria:**
```html
<label for="nome-professor">Nome do professor</label>
<input type="text" name="nome_professor" id="nome-professor">

<label for="turma">Turma</label>
<input type="text" name="turma" id="turma">

<label for="projetor">Projetor/Equipamento</label>
<select name="projetor" id="projetor">
    <option value="">Selecione</option>
    <option value="projetor1">Projetor 1</option>
    <option value="projetor2">Projetor 2</option>
    <option value="tv">TV</option>
</select>
```

#### **3. Falta de Label para o Select**
- O `<select>` não possui uma `<label>` associada
- Prejudica a acessibilidade e usabilidade

#### **4. Action do Form Vazio**
```html
<form action="">  ❌ Action não especificada
```
Deve apontar para um servidor ou arquivo de processamento.

#### **5. Indentação Inconsistente**
- Indentação inadequada em alguns elementos
- Não segue padrão consistente (4 espaços ou tabs)

---

### 📊 **RESUMO DA AVALIAÇÃO**

| Critério | Nota | Observações |
|----------|------|-------------|
| **Tags Semânticas HTML5** | 8/10 | Bom uso geral, mas tabela estruturada incorretamente |
| **Estruturação de Formulários** | 4/10 | Labels não associados, selects sem label, ids vazios |
| **Código Limpo e Indentado** | 7/10 | Sem divs excessivas, mas indentação inconsistente |
| **NOTA GERAL** | **6/10** | Código com potencial, mas com erros estruturais significativos |

---

### 🔧 **RECOMENDAÇÕES PARA MELHORIA**

1. ✔️ **Corrigir a tabela** - Seguir estrutura HTML semântica correta
2. ✔️ **Associar labels aos inputs** - Preenchendo `for=""` com IDs válidos
3. ✔️ **Adicionar label ao select** - Melhora acessibilidade
4. ✔️ **Consistência na indentação** - 4 espaços ou tabs em todo o arquivo
5. ✔️ **Preenchimento de atributos** - Evitar `name=""`, `id=""` vazios
6. ✔️ **Especificar action do form** - Apontar para servidor/backend

---

**Data da Avaliação:** 26/05/2026

# Avaliação do app.js: 5/10 + Ponto_Extra 5 = 10

## Análise Detalhada

### ✅ Pontos Positivos

1. **Estrutura básica correta** - Seleção de elementos DOM e event listeners implementados
2. **Tentativa de validação** - Há esforço em validar campos vazios e datas passadas
3. **Uso de localStorage** - Demonstra conhecimento de persistência de dados
4. **Uso de métodos modernos** - `querySelector`, `addEventListener`, `JSON.stringify/parse`

### ❌ Problemas Críticos

1. **Código fora do evento** (linhas 8-41)
   - As validações e criação de objetos estão FORA do `submit` event listener
   - Isso significa que rodam quando a página carrega, não quando o formulário é enviado
   - **Impacto**: O código quebra na linha 7 (tenta acessar `.value` antes do usuário interagir)

2. **Variável `contactInfo` não definida**
   - Usada nas linhas 32 e 40, mas nunca capturada do formulário
   - **Impacto**: Erro de referência e dados incompletos

3. **`reservationDatabase` recriado sempre**
   - Declarado na linha 24 como array vazio
   - Todos os dados são perdidos ao recarregar a página
   - A lógica de carregamento do localStorage (última linha) não é usada

4. **Lógica de verificação ineficaz**
   - `isReserved` é calculada (linhas 38-44) mas NUNCA usada
   - Não há impedimento de reservas duplicadas

5. **Tabela sem body**
   - Cria `<tr>` diretamente e adiciona ao elemento com ID `#reservation-list`
   - Provavelmente deveria ser `tbody` em vez de direto na tabela

### 📋 Código Corrigido (Sugestão)

```javascript
const reservationForm = document.querySelector('#reservation-form');
const reservationList = document.querySelector('#reservation-list tbody'); // ou tbody correto
let reservationDatabase = JSON.parse(localStorage.getItem('reservations')) || [];

reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Capturar valores DENTRO do evento
    const teacherName = document.querySelector('#teacher-name').value;
    const reservationDate = document.querySelector('#reservation-name').value;
    const startTime = document.querySelector('#starttime').value;
    const projectorModel = document.querySelector('#projectormodel').value;
    const contactInfo = document.querySelector('#contact-info').value; // Adicionar
    
    // Validações
    if (teacherName === '' || reservationDate === '' || startTime === '' || projectorModel === '') {
        alert('Preencha todos os campos!');
        return;
    }
    
    const currentDate = new Date().toISOString().split('T')[0];
    if (reservationDate < currentDate) {
        alert('Não é permitido agendar datas passadas!');
        return;
    }
    
    // Verificar duplicatas ANTES de adicionar
    const isReserved = reservationDatabase.some(function(reservation) {
        return (
            reservation.projectorModel === projectorModel &&
            reservation.reservationDate === reservationDate &&
            reservation.startTime === startTime
        );
    });
    
    if (isReserved) {
        alert('Este projetor já está reservado nesta data/hora!');
        return;
    }
    
    // Criar e adicionar nova reserva
    const newReservation = { teacherName, reservationDate, startTime, projectorModel, contactInfo };
    reservationDatabase.push(newReservation);
    
    // Renderizar na tabela
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td>${teacherName}</td>
        <td>${reservationDate}</td>
        <td>${startTime}</td>
        <td>${projectorModel}</td>
        <td>${contactInfo}</td>
    `;
    reservationList.appendChild(tableRow);
    
    // Salvar e limpar
    localStorage.setItem('reservations', JSON.stringify(reservationDatabase));
    reservationForm.reset();
    console.log('Reserva realizada com sucesso!');
});
```

### 🎯 Recomendações de Aprendizado

1. Entender o fluxo de eventos (quando o código executa)
2. Praticar validações DENTRO dos event listeners
3. Trabalhar com localStorage persistindo e carregando dados corretamente
4. Testar no console do navegador para encontrar erros mais cedo

**Conclusão**: O código mostra compreensão dos conceitos, mas tem erros de lógica que impedem o funcionamento. Com ajustes estruturais simples, funcionará corretamente. 👍
