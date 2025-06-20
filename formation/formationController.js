import { Formation } from "./formationModel.js";

export async function getFormation(req, res) {
  try {
    // Récupération de tous les documents de la collection Formation
    const formations = await Formation.find();

    // Vérification si des formations existent
    if (formations.length === 0) {
      return res.status(404).json({ message: "No formations found" });
    }

    // Envoi des formations en réponse
    res.status(200).json(formations);
  } catch (error) {
    console.error("Error fetching formations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createFormation(req, res) {
  try {
    const { date, location, title, option } = req.body;
    if ((!date, !location, !title)) {
      return res.status(400).json({
        message:
          "Please provide all required fields: date, location, and title.",
      });
    }

    const exist = await Formation.findOne({ title });
    if (exist) {
      return res.status(400).json({
        message:
          "This formation already exists. Please choose a different title.",
      });
    }
    const formation = new Formation({
      date,
      location,
      title,
      option,
    });
    await formation.save();
    res.status(201).json({
      message: "Formation created successfully",
      formation,
    });
  } catch (error) {
    console.error("Error fetching formations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateFormation(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const formationUpdated = await Formation.findByIdAndUpdate(id, data);
    res.status(200).json({
      message: "Formation updated successfully",
      formationUpdated,
    });
  } catch (error) {
    console.error("Error fetching formations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteFormation(req, res) {
  try {
    const { id } = req.params;
    const formationDeleted = await Formation.findByIdAndDelete(id);
    res.status(200).json({
      message: "Formation deleted successfully",
      formationDeleted,
    });
  } catch (error) {
    console.error("Error fetching formations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
