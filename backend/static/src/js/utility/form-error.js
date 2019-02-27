import React from 'react';

export const FormError = ({formError}) =>
    <div className='formError'>
        {Object.keys(formError).map((fieldName, i) => {
            if(formError[fieldName].length > 0){
                return (
                    <div key={i} className="card-body">{fieldName} {formError[fieldName]}</div>
                );
            }
            else {
                return '';
            }
        })}
    </div>