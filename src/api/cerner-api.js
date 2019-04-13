import $ from 'jquery';

export function getPatientInformation(success, error) {
    $.ajax({
        url: 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient?_id=4342009',
        type: 'GET',
        headers: {
          Accept: 'application/json+fhir',
        },
        success: (response) => success(response),
        error: (error) => error(error),
      })
}

export function getPatientConditions(success, error) {
    $.ajax({
        url: 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition?patient=4342012&clinicalstatus=active',
        type: 'GET',
        headers: {
          Accept: 'application/json+fhir',
        },
        success: (response) => success(response),
        error: (error) => error(error),
    })
}