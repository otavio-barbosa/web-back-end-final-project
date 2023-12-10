const { AgeRange: AgeRangeModel } = require("../models/AgeRange");

const ageRangeController = {
  create: async (req, res) => {
    try {
      const ageRange = {
        country: req.body.country,
        age: req.body.age,
        description: req.body.description
      };

      const response = await AgeRangeModel.create(ageRange);

      res.status(201).json({ response, msg: "Faixa-Etária cadastrada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
        const pageOptions = {
            pagina: parseInt(req.query.pagina),
            limite: parseInt(req.query.limite) 
        }
  
        await AgeRangeModel.find()
        .limit(pageOptions.limite)
        .skip(pageOptions.limite * pageOptions.pagina)
        .then((results) => {
            return res.status(200).send(results);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
      
    } catch (error) {
      console.log(error);
      res.json({msg: "Por favor insira no final da URL um limite de elementos para renderização e qual pagina deseja acessar: /?limite=10/?pagina=1"})
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const ageRange = await AgeRangeModel.findById(id);

      if (!ageRange) {
        res.status(404).json({ msg: "Faixa-Etária não encontrada." });
        return;
      }

      res.json(ageRange);
    } catch (error) {
      console.log(error);
    }
  },
  getByCountry: async (name) => {
    try {
      const ageRange = await AgeRangeModel.findOne({ country: name });
      return ageRange;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const ageRange = await AgeRangeModel.findById(id);

      if (!ageRange) {
        res.status(404).json({ msg: "Informe um id válido." });
        return;
      }

      const deletedAgeRange = await AgeRangeModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedAgeRange, msg: "Faixa-etária excluída com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;

    const ageRange = {
        country: req.body.country,
        age: req.body.age,
        description: req.body.description
    };

    const updatedAgeRange = await AgeRangeModel.findByIdAndUpdate(id, ageRange);

    if (!updatedAgeRange) {
      res.status(404).json({ ageRange: "Informe um id válido." });
      return;
    }

    res.status(200).json({ ageRange, msg: "Faixa-etária Atualizada com sucesso!" });
  },
};

module.exports = ageRangeController;
