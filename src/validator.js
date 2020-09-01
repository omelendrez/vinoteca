export default (form, fields) => {

  let isOk = true
  let errors = {}
  fields.map(field => {
    let fieldValue = form[field.fieldId]

    if (field.isRequired) {
      if (!fieldValue) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} es un campo obligatorio`] }
      }
    }

    if (field.isEmail) {
      if (fieldValue && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(fieldValue)) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `Dirección de ${field.label} no es válida`] }
      }
    }

    if (field.isPhone) {
      if (!/(?<=\s|:)\(?(?:(0?[1-3]\d{1,2})\)?(?:\s|-)?)?((?:\d[\d-]{5}|15[\s\d-]{7})\d+)/.test(fieldValue)) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `Número de ${field.label} no es válido (291 456456)`] }
      }
    }

    if (field.isLimited) {
      const [min, max] = field.isLimited
      if (fieldValue.length < min) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} tiene que tener al menos ${min} caracteres`] }
      }
      if (fieldValue.length > max) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} no puede tener más de ${max} caracteres`] }
      }
    }

    if (field.onlyText) {
      if (!/^[a-zA-Z ]*$/.test(fieldValue)) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} no es válido, sólo se aceptan letras y espacios`] }
      }
    }

    if (field.isRange) {
      const [min, max] = field.isRange
      if (fieldValue < min) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} tiene que ser al menos ${min}`] }
      }
      if (max && fieldValue > max) {
        isOk = false
        errors = { ...errors, [field.fieldId]: ['is-danger', `Campo ${field.label} no puede ser más de ${max}`] }
      }
    }

    if (field.compare) {
      const [fld, sign] = field.compare
      const secFldValue = form[fld]
      switch (sign) {
        case '<=':
          if (!(fieldValue <= secFldValue)) {
            isOk = false
            errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} no puede ser mayor a ${secFldValue}`] }
          }
          break
        case '>=':
          if (!(fieldValue >= secFldValue)) {
            isOk = false
            errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} no puede ser menor a ${secFldValue}`] }
          }
          break
        case '>':
          if (!(fieldValue > secFldValue)) {
            isOk = false
            errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} debe ser mayor a ${secFldValue}`] }
          }
          break
        case '<':
          if (!(fieldValue < secFldValue)) {
            isOk = false
            errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} debe ser menor a ${secFldValue}`] }
          }
          break
        default:
          if (!(fieldValue = secFldValue)) {
            isOk = false
            errors = { ...errors, [field.fieldId]: ['is-danger', `${field.label} debe ser ${secFldValue}`] }
          }
      }
    }
    return field
  })

  return [errors, isOk]

}