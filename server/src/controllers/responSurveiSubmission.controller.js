import * as responSurveiSubmissionService from '../services/responSurveiSubmission.service.js';

export const getDraft = async (req, res) => {
  try {
    const [responSurvei] = await responSurveiSubmissionService.getOrCreateDraft(
      req.params.surveiId, 
      req.user.userId 
    );
    
    res.json({
      status: 'success',
      data: {
        draft: responSurvei.respon,
        is_completed: responSurvei.is_completed
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updateDraft = async (req, res) => {
  try {
    const { respon } = req.body;
    const result = await responSurveiSubmissionService.saveDraftResponse(
      req.params.surveiId,
      req.user.userId,
      respon
    );
    
    res.json({ status: 'success', data: result });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const submitRespons = async (req, res) => {
  try {
    await responSurveiSubmissionService.submitFinalResponse(
      req.params.surveiId,
      req.user.userId,
    );
    
    res.json({ 
      status: 'success',
      message: 'Survei submitted successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
