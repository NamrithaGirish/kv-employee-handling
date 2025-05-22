import { AirbagService, CrashSensor, AirbagIgniter, AirbagResult } from '../../services/airbag.service';

import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';

describe('AirbagService', () => 
{
    let service: AirbagService ;
    let sensorMock:MockProxy<CrashSensor>;
    let igniterMock:MockProxy<AirbagIgniter>;
    beforeEach(() => {
        sensorMock = mock<CrashSensor>();
        igniterMock = mock<AirbagIgniter>();
        service = new AirbagService(sensorMock, igniterMock);
    });

    it('deploys the airbag when a crash is detected', () => {
        
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true)

        const result = service.deployAirbag();

        expect(result).toEqual({ triggered: true, force: 100, timing: 50 });
    });

    it('does not deploy the airbag when a crash is not detected', () => {
        
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false)

        const result = service.deployAirbag();
        
        expect(result).toEqual({ triggered: false });
        expect(result).not.toEqual({ triggered: true, force: 100, timing: 50 });

        expect(sensorMock.isCrashDetected).toHaveBeenCalledTimes(1);

        expect(igniterMock.trigger).toHaveBeenCalledTimes(0);
        expect(igniterMock.trigger).not.toHaveBeenCalled();
        
    });

    it('igniter and isCrashDetected is called when a crash is detected', () => {
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true)

        const result = service.deployAirbag();
        expect(result).toEqual({ triggered: true, force: 100, timing: 50 });

        
        expect(sensorMock.isCrashDetected).toHaveBeenCalledTimes(1);
        expect(igniterMock.trigger).toHaveBeenCalledWith(100,50);

        
        
    });

})