import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  StepProps,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import ContainedIconButton from "../mui-component-extra/ContainedIconButton";
import { Question } from "../types/quiz";
import { apiRoutes } from "../routes";
import { useNavigate } from "react-router-dom";

interface QuizProps {
  questions: Question[];
  onFinish: (selectedOptions: SelectedOptions) => void;
}

interface SelectedOptions {
  [key: number]: string;
}

const StyledStep = styled(Step)<StepProps>(({ active, theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${
    active ? theme.palette.primary.main : theme.palette.grey[400]
  }`,
}));

const Quiz: React.FC<QuizProps> = ({ questions, onFinish }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, questions.length - 1),
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(0, prevActiveStep - 1));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [activeStep]: value,
    }));
  };

  const currentQuestion = questions[activeStep];

  let navigate = useNavigate()
  const navigatetoResult = () => {
    let path = apiRoutes.EXHIBIT_RESULT
    navigate(path)
  }

  return (
    <Stack spacing={6}>
      <Stepper activeStep={activeStep} alternativeLabel connector={null}>
        {questions.map((_, index) => (
          <StyledStep
            key={index}
            active={activeStep === index}
            completed={!!selectedOptions[index]}
            onClick={() => {
              setActiveStep(index);
            }}
          >
            <StepLabel />
          </StyledStep>
        ))}
      </Stepper>
      <Box px={2}>
        <FormControl component="fieldset">
          <Typography mb={3} fontWeight={500}>
            {currentQuestion.question}
          </Typography>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={selectedOptions[activeStep] || ""}
            onChange={handleOptionChange}
          >
            <Stack spacing={1} useFlexGap>
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <ContainedIconButton
          disabled={activeStep === 0}
          onClick={handleBack}
          disableRipple
        >
          <NavigateBefore />
        </ContainedIconButton>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {onFinish(selectedOptions); navigatetoResult()}}
        >
          Submit Quiz
        </Button>
        <ContainedIconButton
          disabled={activeStep === questions.length - 1}
          disableRipple
          onClick={handleNext}
        >
          <NavigateNext />
        </ContainedIconButton>
      </Box>
    </Stack>
  );
};

export default Quiz;
