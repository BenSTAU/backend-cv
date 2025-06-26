import { Competence } from "./competenceModel.js";

export async function getCompetence(req, res) {
  try {
    // Récupération de tous les documents de la collection Competence
    const competences = await Competence.find();

    // Vérification si des competences existent
    if (competences.length === 0) {
      return res.status(404).json({ message: "No competences found" });
    }

    // Envoi des competences en réponse
    res.status(200).json(competences);
  } catch (error) {
    console.error("Error fetching competences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createCompetence(req, res) {
  try {
    const { name, master } = req.body;
    if (!name || !master) {
      return res.status(400).json({
        message: "Please provide all required fields: name and master.",
      });
    }

    const exist = await Competence.findOne({ name });
    if (exist) {
      return res.status(400).json({
        message: "This skill already exists. Please choose a different name.",
      });
    }
    const competence = new Competence({
      name,
      master,
    });
    await competence.save();
    res.status(201).json({
      message: "skill created successfully",
      competence,
    });
  } catch (error) {
    console.error("Error fetching competences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateCompetence(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const competenceUpdated = await Competence.findByIdAndUpdate(id, data);
    res.status(200).json({
      message: "skill updated successfully",
      competenceUpdated,
    });
  } catch (error) {
    console.error("Error fetching competences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteCompetence(req, res) {
  try {
    const { id } = req.params;
    const competenceDeleted = await Competence.findByIdAndDelete(id);
    res.status(200).json({
      message: "skill deleted successfully",
      competenceDeleted,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
