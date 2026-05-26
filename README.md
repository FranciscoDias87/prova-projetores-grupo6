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
